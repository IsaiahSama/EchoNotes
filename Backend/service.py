from transformers import GPT2LMHeadModel, GPT2Tokenizer

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
        self.setup_models = self.setup_model()

        self.tokenizer: GPT2Tokenizer = self.setup_models[0]
        self.model: GPT2LMHeadModel = self.setup_models[1]

    def setup_model(self) -> tuple:
        """Sets up the GPT-2 model
        
        Return:
            tuple (GPT2Tokenizer, GPT2LMHeadModel): The instance of the setup tokenizer and model"""
        
        # Load the GPT-2 model
        model_name = "gpt2"
        tokenizer = GPT2Tokenizer.from_pretrained(model_name)
        model = GPT2LMHeadModel.from_pretrained(model_name, pad_token_id=tokenizer.eos_token_id)
        return tokenizer, model

    def get_original_transcript(self) -> str:
        """Returns the original transcript."""
        return self.original_transcript

    def update_conversation(self, message:str):
        """Updates the conversation list with the provided message
        
        Args:
            message (str): The message to be added to the conversation"""
        
        self.conversation.append(message)

    def clear_conversation(self):
        """Method used to clear the conversation."""
        self.conversation.clear()

    def modify_transcript(self, modification: str) -> str:
        """Used to modify the transcript with the last message sent from the user
        
        Args:
            modification (str): The modification to be made
        Returns:
            str: The modified transcript"""

        response = self.generate_response(modification + "\n\n" + self.transcript)
        return response
    
    def query_transcript(self, query: str) -> str:
        """Used to ask a query about the transcript
        
        Args:
            query (str): The query to be asked
            
        Return:
            str: The model's response"""
        
        self.update_conversation(query)
        response = self.generate_response(self.transcript + "\n\n" + query)
        return response
    

    def generate_response(self, prompt: str) -> str:
        """This method generates a response from the model given a prompt.
        
        Args:
            prompt (str): The prompt to the model.
            
        Returns:
            str: The model's output"""

        tokenized = self.tokenizer.encode(prompt, return_tensors="pt")

        # generate the response
        responses = self.model.generate(
            tokenized,
            max_length=10000,
            num_beams=10,
            no_repeat_ngram_size=3,
        )

        final_response = "\n".join([self.tokenizer.decode(response, skip_special_tokens=True) for response in responses])
        return final_response
