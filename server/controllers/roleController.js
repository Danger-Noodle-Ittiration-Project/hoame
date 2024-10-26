const db = require('../models/hoameModels.js');

/*
   Manages user roles and permission,
   fetches and checks for certain roles to allow access
*/

const roleController = {};

// function to get roles by userId
roleController.getUserRoles = async (userId) => {
  const query = `
    SELECT roles.role_name 
    FROM roles
    JOIN user_roles ON roles.id = user_roles.role_id
    JOIN users ON user_roles.users_id = users.id
    WHERE users.id = $1;
  `;

  const values = [userId];

  try {
    const result = await db.query(query, values);
    return result.rows.map((row) => row.role_name); // return list of role names
  } catch (err) {
    throw new Error('Error fetching user roles: ' + err.message);
  }
};

// function to check permissions
roleController.checkPermissions = (requiredRoles) => {
  return (req, res, next) => {
    try {
      // check if session and user exist in request
      const userRoles = req.session.user ? req.session.user.roles : null;

      // if no roles found or user is not logged in
      if (!userRoles) {
        return res
          .status(403)
          .json({ message: 'Access Denied: Not Authorized' });
      }

      // check if user has at least one required role
      const hasPermission = userRoles.some((role) =>
        requiredRoles.includes(role)
      );

      if (!hasPermission) {
        return res
          .status(403)
          .json({ message: 'Access Denied: Insufficient Permissions' });
      }

      // continue if user has required role
      return next();
    } catch (err) {
      console.error('Error in checkPermissions middleware:', err);
      return res
        .status(500)
        .json({ message: 'Server Error: Unable to check permissions' });
    }
  };
};


roleController.assignRole = async (req, res, next) => {
  const { userId, newRoleId } = req.body;

  try {
    // Remove 'Pending_approval' role from the user
    await db.query(
      "DELETE FROM user_role WHERE users_id = $1 AND role_id = (SELECT id FROM roles WHERE role_name = 'pending_approval')",
      [userId]
    );

    // Assign the new role
    await db.query(
      'INSERT INTO user_role (users_id, role_id) VALUES ($1, $2)',
      [userId, newRoleId]
    );

    res.status(200).json({ message: 'Role assigned successfully and user approved.' });
  } catch (err) {
    return next({
      log: 'Error in roleController.assignRole',
      message: { err: 'Error assigning role to user.' },
    });
  }
};


module.exports = roleController;
