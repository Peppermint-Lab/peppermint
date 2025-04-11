import React from 'react';
import { useQuery } from 'react-query';
import { getCookie } from 'cookies-next';
import { useUser } from '../../store/session';
import { RefreshCw } from 'lucide-react'; //Refresh icon

const fetchTickets = async () => {
  const token = getCookie('session');
  const res = await fetch('/api/v1/tickets/all', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch tickets');
  }
  return res.json();
};

export default function Metrics() {
  const { user } = useUser();
  if (!user?.isAdmin) return <div>Access Denied</div>;

  const [period, setPeriod] = React.useState<'week' | 'month' | 'year' | 'all'>('all');

  const { data, error, isLoading, isFetching, refetch } = useQuery(
    'metrics-tickets',
    fetchTickets,
    {
      refetchInterval: 30000, // Refetch every 30 seconds
      staleTime: Infinity, // Keep data fresh until refetch
    }
  );

  const metricsData = React.useMemo(() => {
    if (!data || !data.tickets) {
      return {
        userMetrics: [],
      };
    }

    const tickets = data.tickets;

    // Log ticket data for debugging
    console.log('Metrics - Tickets:', tickets.map((t: any) => ({
      id: t.id,
      Number: t.Number,
      title: t.title,
      status: t.status,
      isComplete: t.isComplete,
      createdBy: t.createdBy?.name,
      assignedTo: t.assignedTo?.name,
      updatedAt: t.updatedAt,
    })));

    // Calculate period start date for filtering completed tickets
    const now = new Date();
    let periodStart: Date;
    switch (period) {
      case 'week':
        // Start of the current week (Monday)
        periodStart = new Date(now);
        periodStart.setDate(now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1));
        periodStart.setHours(0, 0, 0, 0);
        break;
      case 'month':
        // Start of the current month
        periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        // Start of the current year
        periodStart = new Date(now.getFullYear(), 0, 1);
        break;
      case 'all':
      default:
        periodStart = new Date(0); // Very early date for "all time"
        break;
    }

    // group tickets by user for created tickets (all time)
    const createdCounts: Record<string, number> = tickets.reduce(
      (acc: Record<string, number>, t: any) => {
        const creator = t.createdBy?.name || 'Unknown';
        acc[creator] = (acc[creator] || 0) + 1;
        return acc;
      },
      {}
    );

    // group completed tickets by assigned user, filtered by period
    const completedCounts: Record<string, number> = tickets
      .filter((t: any) => {
        const isDone = t.status === 'done' || t.isComplete;
        const updatedAt = new Date(t.updatedAt);
        return isDone && updatedAt >= periodStart;
      })
      .reduce((acc: Record<string, number>, t: any) => {
        const assignee = t.assignedTo?.name || 'Unassigned';
        acc[assignee] = (acc[assignee] || 0) + 1;
        return acc;
      }, {});

    // Group open tickets by assigned user (current state)
    const openCounts: Record<string, number> = tickets
      .filter((t: any) => t.status !== 'done' && !t.isComplete)
      .reduce((acc: Record<string, number>, t: any) => {
        const assignee = t.assignedTo?.name || 'Unassigned';
        acc[assignee] = (acc[assignee] || 0) + 1;
        return acc;
      }, {});

    // combine users from created, completed, and open counts
    const allUsers = new Set([
      ...Object.keys(createdCounts),
      ...Object.keys(completedCounts),
      ...Object.keys(openCounts),
    ]);

    // user metrics array
    const userMetrics = Array.from(allUsers).map(name => ({
      name,
      created: createdCounts[name] || 0,
      completed: completedCounts[name] || 0,
      open: openCounts[name] || 0,
    }));

    // Sort by completed tickets (descending), then by created tickets (descending)
    userMetrics.sort((a, b) => {
      if (b.completed !== a.completed) {
        return b.completed - a.completed;
      }
      return b.created - a.created;
    });

    return { userMetrics };
  }, [data, period]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto shadow-md p-6 bg-white rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-center">Ticket Metrics</h1>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className={`flex items-center px-3 py-1 rounded-md text-sm font-medium text-white ${
              isFetching ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`}
            />
            {isFetching ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">
            Select Period for Completed Tickets
          </label>
          <select
            value={period}
            onChange={e => setPeriod(e.target.value as 'week' | 'month' | 'year' | 'all')}
            className="border border-gray-300 p-2 w-full rounded-md"
          >
            <option value="all">All Time</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <h2 className="text-xl font-bold mb-2">User Performance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tickets Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tickets Completed ({period === 'all' ? 'All Time' : `This ${period.charAt(0).toUpperCase() + period.slice(1)}`})
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tickets Open
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {metricsData.userMetrics.map(user => (
                <tr key={user.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.created}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.completed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.open}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}