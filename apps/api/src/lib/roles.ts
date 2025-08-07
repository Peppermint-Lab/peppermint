import { prisma, Role, User } from "../prisma";
import { checkSession } from "./session";
import { Permission } from "./types/permissions";

type UserWithRoles = User & {
  roles: Role[];
};

export class InsufficientPermissionsError extends Error {
  constructor(message: string = "Insufficient permissions") {
    super(message);
    this.name = "InsufficientPermissionsError";
  }
}

/**
 * Checks if a user has the required permissions through their roles
 * @param user - The user with their roles loaded
 * @param requiredPermissions - Single permission or array of permissions to check
 * @param requireAll - If true, user must have ALL permissions. If false, only ONE permission is required
 * @returns boolean
 */
export function hasPermission(
  user: UserWithRoles,
  requiredPermissions: Permission | Permission[],
  requireAll: boolean = true
): boolean {
  // Admins have all permissions
  if (user?.isAdmin) {
    return true;
  }

  // Convert single permission to array for consistent handling
  const permissions = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions];

  // Combine all permissions from user's roles and default role
  const userPermissions = new Set<Permission>();

  // Add permissions from default role if it exists
  const defaultRole = user.roles.find((role) => role.isDefault);
  if (defaultRole) {
    defaultRole.permissions.forEach((perm) =>
      userPermissions.add(perm as Permission)
    );
  }

  // Add permissions from additional roles
  user.roles.forEach((role) => {
    role.permissions.forEach((perm) => userPermissions.add(perm as Permission));
  });

  if (requireAll) {
    // Check if user has ALL required permissions
    return permissions.every((permission) => userPermissions.has(permission));
  } else {
    // Check if user has AT LEAST ONE of the required permissions
    return permissions.some((permission) => userPermissions.has(permission));
  }
}

/**
 * Authorization middleware that checks for required permissions
 * @param requiredPermissions - Single permission or array of permissions to check
 * @param requireAll - If true, user must have ALL permissions. If false, only ONE permission is required
 */
export function requirePermission(
  requiredPermissions: Permission | Permission[],
  requireAll: boolean = true
) {
  return async (req: any, res: any, next: any) => {
    try {
      const user = await checkSession(req);
      const config = await prisma.config.findFirst();

      if (config?.roles_active) {
        const userWithRoles = user
          ? await prisma.user.findUnique({
              where: { id: user.id },
              include: {
                roles: true,
              },
            })
          : null;

        if (!userWithRoles) {
          return res.status(401).send({
            message: "Unauthorized",
            success: false,
          });
        }

        if (!hasPermission(userWithRoles, requiredPermissions, requireAll)) {
          return res.status(401).send({
            message:
              "You do not have the required permission to access this resource.",
            success: false,
            status: 403,
          });
        }

        return;
      } else {
        return;
      }
    } catch (error) {
      next(error);
    }
  };
}

// Usage examples:
/*
// Check single permission
if (hasPermission(user, 'issue::create')) {
  // Allow create ticket
}

// Check multiple permissions (all required)
if (hasPermission(user, ['issue:update', 'issue:assign'])) {
  // Allow ticket update and assignment
}

// Check multiple permissions (at least one required)
if (hasPermission(user, ['user:manage', 'role:manage'], false)) {
  // Allow access if user has either permission
}

// Use as middleware
router.post('/tickets', 
  requirePermission('issue::create'),
  ticketController.create
);

// Use as middleware with multiple permissions
router.put('/tickets/:id/assign', 
  requirePermission(['issue:update', 'issue:assign']),
  ticketController.assign
);
*/
