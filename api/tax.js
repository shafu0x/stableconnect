/**
 * Tax API endpoint definitions
 */

export const taxEndpoints = {
  "/payee/{github_id}": {
    parameters: {
      path: {
        github_id: {
          type: "string",
          required: true,
          description: "The GitHub ID of the payee",
        },
      },
    },
  },
};

// Function to fetch tax information for a payee
export const fetchPayeeTaxInfo = async (githubId) => {
  const response = await fetch(`/payee/${githubId}`);
  return await response.json();
};
