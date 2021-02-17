const endPointURL = "http://localhost:9000/graphql";

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(endPointURL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const responseBody = await response.json();
  if (responseBody.errors) {
    const errMesssage = responseBody.errors.map((err) => err.message).join("\n");
    throw new Error(errMesssage)
  }
  return responseBody.data;
}

export async function loadJobs() {
  const query = `{
    jobs{
        id
        titlez
        company{
            id
            name
        }
    }
  }`;
  const { jobs } = await graphqlRequest(query);
  return jobs;
}

export async function loadJob(id) {
  const query = `query JobQuery($id: ID!){
    job(id: $id){
        id
        title
        company{
            id
            name
        }
        description
    }
  }`;
  const { job } = await graphqlRequest(query, { id });
  return job;
}
