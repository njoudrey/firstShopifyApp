import gql from "graphql-tag";
import { Query } from "react-apollo";
import store from 'store-js';
import { Card } from '@shopify/polaris'

const GET_PRODUCTS_BY_ID = gql`
    query getProducts($ids: [ID!]!) {
        nodes(ids: $ids) {
            ... on Product {
                title
                handle
                descriptionHtml
                id
                images(first: 1) {
                    edges {
                        node {
                            originalSrc
                            altText
                        }
                    }
                }
                variants(first: 1) {
                    edges {
                        node {
                            price
                            id
                        }
                    }
                }
            }
        }
    }
`;

class ResourceListWithProducts extends React.Component {
    render() {
        return (
            <Query query={GET_PRODUCTS_BY_ID} variables={{ ids: store.get('ids') }}>
                {({ data, loading, error }) => {
                    if (loading) return <div>loading...</div>;
                    if (error) return <div>Error! {error.message}</div>;
                    console.log(data);
                    return (
                        <Card>
                            <p>Products will go here</p>
                        </Card>
                    );
                }}
            </Query>
        );
    }
}

export default ResourceListWithProducts;