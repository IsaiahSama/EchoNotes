from gptservice import Model

my_model = Model(123, "My name is Ish. I like Pineapples. I am 24 years old. I am not really religious, but I am smart.")
prompt = "Tell me 3 things about Ish"

res = my_model.query_transcript(prompt)
print(res)