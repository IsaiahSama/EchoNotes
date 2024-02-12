"""This service uses the Open AI GPT3.5 model for transcriptions."""
from openai import OpenAI
from dotenv import load_dotenv
from os import environ

load_dotenv()

class Model:
    """
        This is a model representing a connection to a GPT2 instance.
    """
    def __init__(self, sid: int, transcript:str, conversation: list=[]):
        """ The constructor.
        Args:
            sid (int): Session id of user.
            transcript (str): The current transcript.
            conversation (list): The current conversation.
        """
        
        self.sid = sid
        self.conversation = conversation
        self.original_transcript = transcript
        self.transcript = transcript
        
        self.client = self.setup_client()

    def setup_client(self) -> OpenAI:
        """Sets up the GPT-2 model
        
        Return:
           OpenAI: The Client"""
        
        client = OpenAI(
            api_key=environ.get("API_KEY")
        )

        self.clear_conversation()


        return client
    
    def pre_prompt(self) -> None:
        """Method used to pre-prompt the AI."""

        prompt = "You are a chatbot designed to converse with users. Below is a transcript following the format [CONTEXT] ... [ENDCONTEXT]. Following this will be a user prompt which will either query or modify the transcript, in the form of [USER] user prompt [ENDUSER] Provide your response."
        self.update_conversation(prompt, "system")

    def make_prompt(self, instructions: str, content:str):
        """Used to create a prompt when provided with the content
        
        Args:
            instructions (str): The instruction for the model to carry out.
            content (str): The content to put inside of the prompt."""
        
        self.update_conversation(instructions, "system")
        prompt = f"[USER] {content} [ENDUSER]"
        self.update_conversation(prompt, "user")


    def get_original_transcript(self) -> str:
        """Returns the original transcript."""
        return self.original_transcript

    def update_conversation(self, message:str, role: str):
        """Updates the conversation list with the provided message
        
        Args:
            message (str): The message to be added to the conversation
            role (str): The role the user sending the message has."""
        
        msg = {"role": role, "content": message}
        self.conversation.append(msg)

    def clear_conversation(self):
        """Method used to clear the conversation."""

        self.conversation.clear()
        self.pre_prompt()
        self.update_conversation(self.transcript, "system")

    def modify_transcript(self, modification: str) -> str:
        """Used to modify the transcript with the last message sent from the user
        
        Args:
            modification (str): The modification to be made
        Returns:
            str: The modified transcript"""

        self.clear_conversation()
        self.make_prompt("Modify the transcript as follows.", modification)
        response = self.generate_response()
        self.transcript = response
        self.clear_conversation()
        return response
    
    def query_transcript(self, query: str) -> str:
        """Used to ask a query about the transcript
        
        Args:
            query (str): The query to be asked
            
        Return:
            str: The model's response"""
        
        self.make_prompt("Using the transcript, answer the following question.", query)
        response = self.generate_response()
        self.update_conversation(response, "assistant")
        return response
    

    def generate_response(self) -> str:
        """This method generates a response from the model given a prompt.
        
        Args:
            prompt (str): The prompt to the model.
            
        Returns:
            str: The model's output"""
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=self.conversation
        )
        return response.choices[0].message.content