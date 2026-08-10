export interface Task {

  _id?: string;

  title: string;

  description: string;

  priority: 'Low' | 'Medium' | 'High';

  status: 'Pending' | 'In Progress' | 'Completed';

  assignedTo: string | {

    _id: string;

    name: string;

    email: string;

  };

  assignedBy?: string | {

    _id: string;

    name: string;

  };

  dueDate: string;

  createdAt?: string;

  updatedAt?: string;

}
