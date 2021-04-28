import React from 'react';
import { Button, Table, Icon, Grid } from 'semantic-ui-react';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

const RequestIndex = ({
  campaignAddress,
  requests,
  approversCount,
  requestCount,
}) => {
  const { Header, Row, HeaderCell, Body } = Table;

  const renderRows = () => {
    return requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={campaignAddress}
          approversCount={approversCount}
        />
      );
    });
  };

  return (
    <Layout>
      <Table>
        <Header>
          <Row>
            <HeaderCell colSpan='5'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span>
                  <h3>Requests</h3>
                </span>
                <span
                  style={{
                    marginLeft: 5,
                    fontWeight: 'normal',
                    fontSize: '16px',
                  }}
                >
                  ({requestCount})
                </span>
              </div>
            </HeaderCell>

            <HeaderCell colSpan='2'>
              <Link
                href='/campaigns/[campaignAddress]/requests/new'
                as={`/campaigns/${campaignAddress}/requests/new`}
              >
                <a>
                  <Button
                    primary
                    floated='right'
                    style={{ marginRight: 20, width: 90 }}
                  >
                    New
                  </Button>
                </a>
              </Link>
            </HeaderCell>
          </Row>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>

        <Body>{renderRows()}</Body>
      </Table>
    </Layout>
  );
};

RequestIndex.getInitialProps = async (ctx) => {
  const { campaignAddress } = ctx.query;
  const campaign = Campaign(campaignAddress);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  console.log(requests);

  return { campaignAddress, requests, requestCount, approversCount };
};

export default RequestIndex;
