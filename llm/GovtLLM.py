from groq import Groq
import os
from dotenv import load_dotenv
from schemes import get_scheme_data

load_dotenv()


client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def summarize_govt_schemes(prompt,schemeName):
    data = get_scheme_data(schemeName)
    full_prompt = f"""Please summarize the following government scheme using the structure below. Keep the language simple and farmer-friendly. Avoid long lists or excessive details — generalize where possible.

            ---
            **Scheme Name:**  
            <Insert scheme name>

            **Objective:**  
            Briefly explain the purpose of the scheme in 1–2 sentences.

            **Key Features:**

            - **Benefit:**  
            Mention the amount or type of benefit provided and its frequency (e.g., ₹6000/year in 3 installments).

            - **Eligibility:**  
            Mention who is eligible in simple terms. If exclusions exist, **summarize** them in **broad categories** like "high-ranking officials", "high-income individuals", "professionals", etc. Avoid listing every specific exclusion.

            - **Application Process:**  
            Describe how to apply — through officials, centers, or online portals.

            - **Required Information/Documents:**  
            Mention details like name, Aadhaar, age, bank account, and any other required documents.

            **Additional Notes:**  
            Mention any important dates, FAQs, or rules about eligibility changes.

            Now apply this format to the scheme below:
                       // {data} //
            Also if {prompt} is given then address the prompt in the response.
            """

    chat_completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role":"system","content":"You are a helpful assistant that summarizes government schemes."},
            {"role":"user","content":full_prompt}
        ],
        max_tokens=600,
        temperature=0.4
    )
    return chat_completion.choices[0].message.content


print(summarize_govt_schemes("What is the cutoff date for determination of eligibility of beneficiaries under the scheme?","Pradhan Mantri Kisan Samman Nidhi"))