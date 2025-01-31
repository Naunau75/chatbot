import os
from mistralai import Mistral
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()


def initialize_client():
    api_key = os.getenv("MISTRAL_API_KEY")
    if not api_key:
        raise ValueError(
            "MISTRAL_API_KEY n'est pas définie dans les variables d'environnement"
        )
    return Mistral(api_key=api_key)


def generate_response(client, user_message):
    chat_response = client.chat.complete(
        model="mistral-large-latest",  # ou "mistral-small-latest" pour un modèle plus léger
        messages=[
            {
                "role": "user",
                "content": user_message,
            }
        ],
    )
    return chat_response.choices[0].message.content


def main():
    print("Initialisation du chatbot...")
    client = initialize_client()
    print("Chatbot prêt ! Vous pouvez commencer à discuter (tapez 'quit' pour quitter)")

    while True:
        user_input = input("\nVous: ")
        if user_input.lower() == "quit":
            print("Au revoir !")
            break

        print("\nBot: ", end="")
        response = generate_response(client, user_input)
        print(response)


if __name__ == "__main__":
    main()
