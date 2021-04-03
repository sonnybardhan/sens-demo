import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY, API_KEYID } from './apiKeys';
import GraphGenerator from './components/GraphGenerator';

function Graph() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const from = new Date(
      new Date().getTime() - 1000 * 60 * 60 * 8
    ).toISOString();
    const to = new Date().toISOString();

    fetch(
      `https://records.gateway.senslabs.io/api/records/get?userId=${id}&from=${from}&to=${to}&key=HeartRate&key=BreathRate`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'x-sens-api-key-id': API_KEYID,
          'x-sens-api-key': API_KEY,
          Authorization: localStorage.getItem('demo-Access_Token'),
        },
      }
    )
      .then((res) => res.json())
      .then(setData)
      .catch(console.log)
      .then(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log('data: ', data);
  }, [data]);

  return (
    <div className='outer-container' style={{ width: '80vw' }}>
      {loading ? (
        'Loading ... '
      ) : data.length ? (
        <GraphGenerator graphData={data} />
      ) : (
        'Processing ... '
      )}
    </div>
  );
}

export default Graph;
