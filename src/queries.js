import gql from "graphql-tag";

export const rolesQuery = gql`
{
    roles {
        id
        name
    }
}
`;

export const permissionsQuery = gql`
{
    permissions {
        id
        name
    }
}
`;


export const getUsersQuery = gql`
{
    users {
        id
        name
        email
    }
}
`;

export const navQuery = gql`
{
    nav {
        id
    }
}
`;

export const categories = gql`
{
    categories {
        id
        name
        parent
    }
}
`;

export const items = gql`
{
    items {
        id
        name
        category {
            id
            name
        }
    }
}
`;

export const notifications = gql`
{
    notifications {
        id
        text
        users {
            name
        }
    }
}
`;

export const files = gql`
query getFiles($path: String) {
  files(path:$path) {
    name
    type
    path
  }
}
`;