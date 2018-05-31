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