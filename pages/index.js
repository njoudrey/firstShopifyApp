import { Page } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from 'store-js';
import ShopNameCard from '../components/ShopNameCard';

class Index extends React.Component {
	state = { open: false }
	render() {
		return (
			<Page
  				title = 'Product selector'
  				primaryAction = {{
  					content: 'select products',
  					onAction: () => this.setState({open: true})
  				}}
  			>
  				<ResourcePicker
  					resourceType='Product'
  					open={this.state.open}
  					onCancel={() => this.setState({open: false})}
  					onSelection={(resources) => this.handleSelection(resources)}
  				/>
				<ShopNameCard/>
  			</Page>
		)
	}
	handleSelection = (resources) => {
		const idFromResources = resources.selection.map((product) => product.id);
		this.setState({open: false})
		store.set('ids', idFromResources);
	}
}

export default Index;
