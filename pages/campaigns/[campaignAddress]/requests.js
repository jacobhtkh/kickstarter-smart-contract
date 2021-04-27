import React from 'react';
import { Button, Table } from 'semantic-ui-react';
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
      <h3>Requests</h3>

      <Table>
        <Header>
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
      <div>
        Found {requestCount} requests.
        <Link
          href='/campaigns/[campaignAddress]/requests/new'
          as={`/campaigns/${campaignAddress}/requests/new`}
        >
          <a>
            <Button primary floated='right'>
              Add Request
            </Button>
          </a>
        </Link>
      </div>
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
