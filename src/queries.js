import gql from "graphql-tag";

export const getRolesQuery = gql`
{
    roles {
        id
        name
    }
}
`;

export const getPermissionsQuery = gql`
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