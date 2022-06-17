const RadiobuttonContent = ["Admin", "Content Manager", "Developer"];

const SensitivePermissionAutomation = [
  {
    Category: "AUTOMATION",
    HeadingCheck: {
      permissionsName: "automation",
      description: "Access commit status",
    },
    Permissions: [
      {
        permissionsName: "read",
        description: "Access commit status",
      },
      {
        permissionsName: "write",
        description: "Access deployment status",
      },
      {
        permissionsName: "publish:write",
        description: "Access respoistory invitation",
      },
      {
        permissionsName: "email_template:read",
        description: "Access commit status",
      },
      {
        permissionsName: "email_template:write",
        description: "Access deployment status",
      },
    ],
  },
   {
    Category: "REFERRAL",
    HeadingCheck: {
      permissionsName: "referral",
      description: "Access commit status",
    },
    Permissions: [
      {
        permissionsName: "read",
        description: "Access commit status",
      },
      {
        permissionsName: "write",
        description: "Access deployment status",
      },
      {
        permissionsName: "publish:write",
        description: "Access respoistory invitation",
      },
      {
        permissionsName: "email_template:read",
        description: "Access commit status",
      },
      {
        permissionsName: "email_template:write",
        description: "Access deployment status",
      },
    ],
  },
];


export { SensitivePermissionAutomation, RadiobuttonContent };


