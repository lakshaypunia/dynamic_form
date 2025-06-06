import dbConnect from "@/lib/mongodb";
import form from "@/models/form";

export async function GET(request) {
  await dbConnect();

  try {
    const count = await form.countDocuments();
    if (count === 0) {
      return new Response(JSON.stringify({ message: "No form found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const randomIndex = Math.floor(Math.random() * count);
    const randomForm = await form.findOne().skip(randomIndex);

    return new Response(JSON.stringify(randomForm.fields), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

