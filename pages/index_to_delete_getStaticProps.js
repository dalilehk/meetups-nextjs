// File system module from node js. works only on the server-side
// special version is ... from 'fs/promises' which return a promise.
import path from 'path';
import fs from 'fs/promises';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.key}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // Next.js Lecture 90
  // fs to get access to dummy_data file
  // cwd - current working directory. It will not be a pages folder. It will be the overall project folder/directory. Thats why, after comma we define to which folder we wanna get,
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // key: redirect . For example, where there is no data
  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }

  // key: notFound
  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    // ISG - it will re-generated at most every 10 seconds. So even if we refresh our site many times during this time it won't re-render .
    revalidate: 10,
  };
}

export default HomePage;
