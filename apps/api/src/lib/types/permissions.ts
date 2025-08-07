export type IssuePermission =
  | 'issue::create'
  | 'issue::read'
  | 'issue::write'
  | 'issue::update'
  | 'issue::delete'
  | 'issue::assign'
  | 'issue::transfer'
  | 'issue::comment';

export type UserPermission =
  | 'user::create'
  | 'user::read'
  | 'user::update'
  | 'user::delete'
  | 'user::manage';

export type RolePermission =
  | 'role::create'
  | 'role::read'
  | 'role::update'
  | 'role::delete'
  | 'role::manage';

export type TeamPermission =
  | 'team::create'
  | 'team::read'
  | 'team::update'
  | 'team::delete'
  | 'team::manage';

export type ClientPermission =
  | 'client::create'
  | 'client::read'
  | 'client::update'
  | 'client::delete'
  | 'client::manage';

export type KnowledgeBasePermission =
  | 'kb::create'
  | 'kb::read'
  | 'kb::update'
  | 'kb::delete'
  | 'kb::manage';

export type SystemPermission =
  | 'settings::view'
  | 'settings::manage'
  | 'webhook::manage'
  | 'integration::manage'
  | 'email_template::manage';

export type TimeTrackingPermission =
  | 'time_entry::create'
  | 'time_entry::read'
  | 'time_entry::update'
  | 'time_entry::delete';

export type ViewPermission =
  | 'docs::manage'
  | 'admin::panel';

export type WebhookPermission =
  | 'webhook::create'
  | 'webhook::read'
  | 'webhook::update'
  | 'webhook::delete';

export type DocumentPermission =
  | 'document::create'
  | 'document::read'
  | 'document::update'
  | 'document::delete'
  | 'document::manage';

export type Permission =
  | IssuePermission
  | UserPermission
  | RolePermission
  | TeamPermission
  | ClientPermission
  | KnowledgeBasePermission
  | SystemPermission
  | TimeTrackingPermission
  | ViewPermission
  | WebhookPermission
  | DocumentPermission;

// Useful type for grouping permissions by category
export const PermissionCategories = {
  ISSUE: 'Issue Management',
  USER: 'User Management',
  ROLE: 'Role Management',
  TEAM: 'Team Management',
  CLIENT: 'Client Management',
  KNOWLEDGE_BASE: 'Knowledge Base',
  SYSTEM: 'System Settings',
  TIME_TRACKING: 'Time Tracking',
  VIEW: 'Views',
  WEBHOOK: 'Webhook Management',
  DOCUMENT: 'Document Management',
} as const;

export type PermissionCategory = typeof PermissionCategories[keyof typeof PermissionCategories];

// Helper type for permission groups
export interface PermissionGroup {
  category: PermissionCategory;
  permissions: Permission[];
}
