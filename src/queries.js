import gql from "graphql-tag";

export const getRolesQuery = gql`
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