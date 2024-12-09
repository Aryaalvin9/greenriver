module.exports = {
    async redirects() {
      return [
        {
          source: "/(.*)",
          has: [
            {
              type: "host",
              value: "greenriverindonesia.com",
            },
          ],
          destination: "https://www.greenriverindonesia.com/:path*",
          permanent: true,
        },
      ];
    },
};
  