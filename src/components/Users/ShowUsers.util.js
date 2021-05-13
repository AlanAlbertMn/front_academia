export const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    {
      id: "name",
      label: "Name",
      minWidth: 170,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "username",
      label: "Username",
      minWidth: 170,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "role",
      label: "Role",
      minWidth: 170,
      align: "left",
      format: (value) => value.toLocaleString("en-US")
    },
    {
      id: "edit",
      label: "Deletion",
      minWidth: 170,
      align: "center",
    },
  ];
  
  
  export const content = {
    deleteButtonText: 'Delete user',
    title: 'Users',
    addButtonText: 'Add user',
    addLink: '/upsert-user'
  }