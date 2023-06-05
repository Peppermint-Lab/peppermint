export default function TicketSubmitted() {
  return (
    <div className="bg-[#111827] h-screen flex items-center justify-center">
      <div className="bg-white shadow sm:rounded-lg w-1/4">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Ticket Submitted
          </h3>
          <div className="mt-5">
            <span>
              Thank you for your ticket, our engineers will be in touch shortly.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
