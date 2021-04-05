class Communicator {
  getData = (url, payload, cb) => {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };

    fetch(url, requestOptions)
      .then(res => res.json())
      .then(data => cb(data));
  }
}

export default Communicator;
