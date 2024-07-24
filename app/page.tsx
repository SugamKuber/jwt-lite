"use client"
import { useState } from 'react';

const Home = () => {
  const [id, setId] = useState('');
  const [payload, setPayload] = useState('');
  const [token, setToken] = useState('');
  const [generatedToken, setGeneratedToken] = useState('');
  const [decodedData, setDecodedData] = useState(null);
  const [error, setError] = useState('');

  const handleGenerateToken = async () => {
    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, payload: JSON.parse(payload) }),
      });

      const data = await response.json();
      if (response.ok) {
        setGeneratedToken(data.token);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('An error occurred while generating the token.');
    }
  };

  const handleDecodeToken = async () => {
    try {
      const response = await fetch('/api/check', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setDecodedData(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('An error occurred while decoding the token.');
    }
  };

  return (
    <div className='ml-10 mt-2'>
      <h1 className='font-bold text-2xl'>Test jwt-lite-2024</h1>
      <h2 className='font-semibold text-xl mt-2'>
        check out <a className='text-green-500' href='https://www.npmjs.com/package/jwt-lite-2024'>
          npm i jwt-lite-2024
        </a>
      </h2>

      <div>
        <h2 className='mt-16 font-bold text-xl'>Generate Token</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerateToken();
          }}
        >
          <div className='mt-4'>
            <label htmlFor="id">ID</label>
            <input
              className="border-black border-2 ml-2"
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor="payload">Payload in Json</label>
            <textarea
              className="border-black border-2 ml-2"
              id="payload"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
            ></textarea>
          </div>
          <button className='bg-gray-400 mt-4 p-2 rounded-xl' type="submit">Generate Token</button>
        </form>
        {generatedToken && (
          <div className="container">
            <div className="mt-4 p-2 border rounded-xl bg-gray-400 overflow-auto" style={{ maxHeight: '200px', maxWidth: '40%', wordBreak: 'break-all' }}>
              {generatedToken}
            </div>
          </div>

        )}
      </div>

      <div className='mt-16'>
        <h2 className='font-bold text-xl'>Decode Token</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDecodeToken();
          }}
        >
          <div className='mt-4'>
            <label htmlFor="token">Token</label>
            <input
              className="border-black border-2 ml-2"
              type="text"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <button className='bg-gray-400 mt-4 p-2 rounded-xl' type="submit">Decode Token</button>
        </form>
        {decodedData && (
          <div className="container">
            <div className="mt-4 p-2 border rounded-xl bg-gray-400 overflow-auto" style={{ maxHeight: '200px', maxWidth: '40%', wordBreak: 'break-all' }}>
              {JSON.stringify(decodedData, null, 2)}
            </div>
          </div>
        )}
      </div>

      {
        error && (
          <div className='my-10'>
            <div className='text-xl text-red-700'>Error : {error}</div>
          </div>
        )
      }
    </div >
  );
};

export default Home;
