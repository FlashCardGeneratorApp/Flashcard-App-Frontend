import openai
from dotenv import dotenv_values

config = dotenv_values(".env")
openai.api_key = config["OPENAI_KEY"]

user_input = input("Text: ")
prompt = """
Your response must be a list of dictionary key-value pairing related to the users input. The length of the list of dictionaries is determined by the user. The correct answer is the dictonaries key's value + 1.
If no input is given, then default is 3 questions. 

User: chinese history 1 question
[{["What dynasty did Qin Shi Huang Found?", "Qing Dynasty", "Han Dynasty", "Song Dynasty", "Zhou Dynasty"]: 1 }]
User: 
"""
prompt = f'{prompt}{user_input}\n'

response = openai.Completion.create(
    model="gpt-3.5-turbo-instruct",
    prompt=prompt,
    max_tokens=250,
    stop=".",
    n=1,
    echo=False,
)
for choice in response.choices:
    print(choice.text)