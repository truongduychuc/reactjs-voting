export const validationMessage = {
  email: {
    required: 'Email is required',
    max: 'Email is only long ${max} characters at maximum',
    email: 'Email must be under format user@example.net',
    not_number: 'Email can not start with number'
  },
  first_name: {
    required: 'First name is required',
    max: 'First name is only long ${max} characters at maximum',
  },
  last_name: {
    required: 'Last name is required',
    max: 'Last name is only long ${max} characters at maximum',
  },
  user_name: {
    required: 'Username is required',
    max: 'Username is only long ${max} characters at maximum',
    exclude_whitespace: 'User name can not include white space'
  },
  english_name: {
    max: 'English name is only long ${max} characters at maximum'
  },
  team_id: {
    required: 'Team selection is required'
  },
  phone: {
    max: 'Phone number is only long ${max} characters at maximum',
    only_number: 'Phone number can only contain the numbers or (+) at first'
  },
  address: {
    max: 'Address is only long ${max} characters at maximum'
  },
  role_id: {
    required: 'Role selection is required'
  }
};
