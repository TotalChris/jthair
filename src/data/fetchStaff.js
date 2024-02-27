export default async () => {
    const sanityQuery = encodeURIComponent(`*[_type == "employee"]{_createdAt, name, jobTitle, "image": image.asset->url} | order(_createdAt asc)`);
    const sanityURL = import.meta.env.VITE_SANITY_ENDPOINT + sanityQuery;
    const response = await fetch(sanityURL);
    const data = await response.json();
    return data.result;
}