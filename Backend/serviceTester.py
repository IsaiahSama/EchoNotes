from service import Model

my_model = Model(123, "")

transcript = "My name is Ish. I like Pineapples. I am 24 years old. I am not really religious, but I am smart."

action = "query"
p = "Tell me 3 things about Ish"
prompt = f"""You are a chatbot designed to converse with users. Below is a transcript following the format [CONTEXT] ... [ENDCONTEXT]. Following this will be a user prompt which will {action} the transcript, in the form of [USER] user prompt [ENDUSER] Provide a response in the form: [RESPONSE]: Response here [ENDRESPONSE].

[CONTEXT]
{transcript}
[ENDCONTEXT]

[USER]
{p}
[ENDUSER]

[RESPONSE]
"""
res = my_model.query_transcript(prompt)
print(res)