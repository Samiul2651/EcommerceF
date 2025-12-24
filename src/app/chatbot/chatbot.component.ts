import { Component, OnInit, HostListener } from '@angular/core';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit {
  isOpen: boolean = false;
  messages: Message[] = [];
  userMessage: string = '';

  // Draggable properties
  isDragging: boolean = false;
  dragStartX: number = 0;
  dragStartY: number = 0;
  buttonX: number = 0;
  buttonY: number = 0;
  hasMoved: boolean = false;

  ngOnInit(): void {
    // Set initial position (bottom right)
    this.buttonX = window.innerWidth - 100;
    this.buttonY = window.innerHeight - 100;

    // Welcome message
    this.addBotMessage("Hi! I'm your shopping assistant. How can I help you today?");
  }

  // Mouse down on button - start dragging
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.hasMoved = false;
    this.dragStartX = event.clientX - this.buttonX;
    this.dragStartY = event.clientY - this.buttonY;
    event.preventDefault();
  }

  // Mouse move - drag the button
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.hasMoved = true;
      this.buttonX = event.clientX - this.dragStartX;
      this.buttonY = event.clientY - this.dragStartY;

      // Keep button within viewport
      this.buttonX = Math.max(0, Math.min(this.buttonX, window.innerWidth - 70));
      this.buttonY = Math.max(0, Math.min(this.buttonY, window.innerHeight - 70));
    }
  }

  // Mouse up - stop dragging
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (this.isDragging && !this.hasMoved) {
      // Only toggle if we didn't drag
      this.toggleChat();
    }
    this.isDragging = false;
    this.hasMoved = false;
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  closeChat(): void {
    this.isOpen = false;
  }

  sendMessage(): void {
    if (this.userMessage.trim() === '') return;

    // Add user message
    this.messages.push({
      text: this.userMessage,
      isUser: true,
      timestamp: new Date()
    });

    const userMsg = this.userMessage.toLowerCase();
    this.userMessage = '';

    // Simulate bot response
    setTimeout(() => {
      this.addBotMessage(this.generateResponse(userMsg));
      this.scrollToBottom();
    }, 500);

    this.scrollToBottom();
  }

  addBotMessage(text: string): void {
    this.messages.push({
      text: text,
      isUser: false,
      timestamp: new Date()
    });
  }

  generateResponse(userMessage: string): string {
    // Generic responses based on keywords
    if (userMessage.includes('hello') || userMessage.includes('hi')) {
      return "Hello! Welcome to our store. How can I assist you today?";
    } else if (userMessage.includes('product') || userMessage.includes('item')) {
      return "We have a wide range of products available. You can browse our catalog or search for specific items.";
    } else if (userMessage.includes('price') || userMessage.includes('cost')) {
      return "Our products are competitively priced. Check out the product details for pricing information.";
    } else if (userMessage.includes('help')) {
      return "I'm here to help! You can ask me about products, orders, shipping, or anything else.";
    } else if (userMessage.includes('order') || userMessage.includes('track')) {
      return "You can track your orders from the Orders page. Just log in to view your order history.";
    } else if (userMessage.includes('shipping') || userMessage.includes('delivery')) {
      return "We offer fast shipping! Delivery times vary based on your location.";
    } else if (userMessage.includes('return') || userMessage.includes('refund')) {
      return "We have a 30-day return policy. Contact support for assistance with returns.";
    } else if (userMessage.includes('payment')) {
      return "We accept all major credit cards and secure payment methods.";
    } else if (userMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else if (userMessage.includes('bye') || userMessage.includes('goodbye')) {
      return "Goodbye! Have a great day and happy shopping!";
    } else {
      const responses = [
        "That's interesting! How can I help you with that?",
        "I'm here to assist you. Could you provide more details?",
        "Thanks for your message! Let me know if you need any specific information.",
        "I'd be happy to help! What would you like to know?",
        "Feel free to browse our products or ask me any questions!"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const chatMessages = document.querySelector('.chat-messages');
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }, 100);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  getButtonStyle(): any {
    return {
      left: this.buttonX + 'px',
      top: this.buttonY + 'px',
      cursor: this.isDragging ? 'grabbing' : 'grab'
    };
  }
}
