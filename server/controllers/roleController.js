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


roleController.assignMultipleRoles = async (req, res, next) => {
  const { userId, roleIds } = req.body;

  console.log("User ID:", userId);
  console.log("Role IDs:", roleIds);

  if (!userId || !Array.isArray(roleIds) || roleIds.length === 0) {
    return res
      .status(400)
      .json({ message: "User ID and an array of role IDs are required." });
  }

  try {
    await db.query("BEGIN"); // Start a transaction

    // Remove 'Pending_approval' role from the user
    const deleteResult = await db.query(
      "DELETE FROM user_roles WHERE users_id = $1 AND role_id = (SELECT id FROM roles WHERE role_name = 'pending_approval')",
      [userId]
    );
    console.log("Delete result:", deleteResult.rowCount); // Log delete result

    // Assign each role in the array
    for (const roleId of roleIds) {
      const insertResult = await db.query(
        "INSERT INTO user_roles (users_id, role_id) VALUES ($1, $2)",
        [userId, roleId]
      );
      console.log(
        "Insert result for role ID",
        roleId,
        ":",
        insertResult.rowCount
      ); // Log insert result
    }

    await db.query("COMMIT"); 
    res
      .status(200)
      .json({ message: "Roles assigned successfully and user approved." });
  } catch (err) {
    await db.query("ROLLBACK"); // Rollback transaction in case of error
    console.error("Error in roleController.assignMultipleRoles:", err); // Log detailed error
    return next({
      log: "Error in roleController.assignMultipleRoles",
      message: { err: "Error assigning multiple roles to user." },
    });
  }
};



// Function to get all roles
roleController.getAllRoles = async (req, res, next) => {
  const query = `SELECT id, role_name FROM roles`;

  try {
    const result = await db.query(query);
    res.locals.roles = result.rows; // Store roles in res.locals
    return next();
  } catch (err) {
    return next({
      log: 'Error in roleController.getAllRoles',
      message: { err: 'Error fetching roles from the database.' },
    });
  }
};


module.exports = roleController;
