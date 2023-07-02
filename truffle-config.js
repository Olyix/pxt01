module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",     // Localhost (default: none)
        port: 7545,            // Standard Ethereum port (default: none)
        network_id: "*",       // Any network (default: none)
      },
    },
  
    // Configure your compilers
    compilers: {
      solc: {
        version: "^0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
        settings: {          // See the solidity docs for advice about optimization and evmVersion
          optimizer: {
            enabled: true,
            runs: 200
          },
        },
      },
    },
  
    db: {
      enabled: false
    }
  };
  