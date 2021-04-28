import React from 'react';
// import { useEffect, useState } from 'react';

import { Card, Button, Grid } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import Link from 'next/link';

const CampaignIndex = ({ campaigns }) => {
  // Next JS means we dont need all of this code due to server side rendering.
  // const [campaigns, setCampaigns] = useState([]);

  // useEffect(() => {
  //   const abortController = new AbortController();

  //   void (async function fetchFactoryData() {
  //     const campaigns = await factory.methods.getDeployedCampaigns().call();
  //     console.log(campaigns);
  //     setCampaigns(campaigns);
  //   })();

  //   return () => {
  //     abortController.abort();
  //   };
  // }, []);

  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link
            href='/campaigns/[campaignAddress]'
            as={`/campaigns/${address}`}
          >
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>

        <Grid>
          <Grid.Row>
            <Grid.Column>{renderCampaigns()}</Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link href='/campaigns/new'>
                <a>
                  <Button
                    content='Create a Campaign'
                    // icon='add circle'
                    primary
                  />
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </Layout>
  );
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { campaigns };
};

export default CampaignIndex;
