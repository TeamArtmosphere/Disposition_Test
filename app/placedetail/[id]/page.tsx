import React from 'react';

// export async function generateStaticParams() {
//   //   const placedetail = await getPlace();

//   const res = await fetch('/api/v1/artmosphere-places/1');
//   const placedetail = await res.json();

//   return placedetail.map((place: any) => ({
//     id: place.id.toString(),
//   }));

//   return placedetail.id;
// }

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(id);

  return <div>My Post: {id}</div>;
};

export default Page;
