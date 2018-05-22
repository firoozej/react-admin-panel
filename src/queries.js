import gql from "graphql-tag";

export const getRolesQuery = gql`
{
    roles {
        id
        name
    }
}
`;