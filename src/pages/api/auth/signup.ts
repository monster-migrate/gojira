import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Call the GraphQL API to create the user
    const graphqlResponse = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation CreateUser($name: String!, $email: String!, $password: String!, $role: UserRole!) {
            createUser(name: $name, email: $email, password: $password, role: $role) {
              email
              name
              role
            }
          }
        `,
        variables: { name, email, password: hashedPassword, role },
      }),
    });

    const result = await graphqlResponse.json();

    if (result.errors) {
      return res.status(400).json({ error: result.errors[0].message });
    }

    return res.status(201).json({
      message: "User registered successfully!",
      user: result.data.createUser,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
