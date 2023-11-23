import openai
from dotenv import dotenv_values

config = dotenv_values(".env")
openai.api_key = config["OPENAI_KEY"]

def generate_questions(user_prompt):
    prompt = """
    Your response must be a list of dictionary key-value pairing related to the users input. The length of the list of dictionaries is determined by the user. The correct answer is the dictonary key's value.
    If no input is given, then default is 3 questions. 

    User: ww2 2 questions
    [{["When did the second world war begin?", "1939", "1938", "1945", "1944"]: 1 }, {["Who was the leader of Nazi Germany?", "Jospeh Stalin", "Joseph Goebbels", "Heinrich Himmler", "Adolf Hitler"] : 4}]
    User: 
    """
    new_prompt = f'{prompt}{user_prompt}\n'

    response = openai.Completion.create(
        model="gpt-4-1106-preview",
        prompt=new_prompt,
        # max_tokens=250,
        stop=".",
        n=1,
        echo=False,
    )
    return response.choices[0].text

def main():
    user_input = input("Text: ")
    print(generate_questions(user_prompt = user_input))

if __name__ == "__main__":
    main()