import gql from "graphql-tag";
import { Query } from 'react-apollo';
import { Card } from '@shopify/polaris';

const GET_STORE_NAME = gql`
    query {
        shop {
            name
        }
    }
`;

class ShopNameCard extends React.Component {
    render() {
        return (
            <Query query={GET_STORE_NAME}>
                {({ data, loading, error }) => {
                    if (loading) return <div>loading...</div>;
                    if (error) return <div>Error! {error.message}</div>;
                    return (
                        <Card>
                            <p>{data.shop.name}</p>
                        </Card>
                    );
                }}
            </Query>
        );
    }

}

export default ShopNameCard;