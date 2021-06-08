import * as React from 'react';
import type { NoticeFunc } from './Notification';
import type Notification from './Notification';
export default function useNotification(notificationInstance: Notification): [NoticeFunc, React.ReactElement];
