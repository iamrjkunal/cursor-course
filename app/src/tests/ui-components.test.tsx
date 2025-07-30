import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { 
  ChatInterface, 
  ChatHeader, 
  EmptyState, 
  InputArea, 
  Message, 
  ModeToggle 
} from '../components';

// Mock components for ChatInterface testing
const MockHeader = () => <div data-testid="mock-header">Header</div>;
const MockFooter = () => <div data-testid="mock-footer">Footer</div>;
const MockContent = () => <div data-testid="mock-content">Content</div>;

describe('ChatInterface Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<ChatInterface />);
    expect(container).toBeTruthy();
  });

  it('renders header, content and footer when provided', () => {
    render(
      <ChatInterface 
        header={<MockHeader />}
        footer={<MockFooter />}
      >
        <MockContent />
      </ChatInterface>
    );
    
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });
});

describe('ChatHeader Component', () => {
  it('renders the title correctly', () => {
    render(<ChatHeader title="Test Chat" />);
    expect(screen.getByText('Test Chat')).toBeInTheDocument();
  });

  it('calls onNewChat when button is clicked', () => {
    const handleNewChat = vi.fn();
    render(<ChatHeader onNewChat={handleNewChat} />);
    
    const button = screen.getByRole('button', { name: /new chat/i });
    fireEvent.click(button);
    
    expect(handleNewChat).toHaveBeenCalledTimes(1);
  });
});

describe('EmptyState Component', () => {
  it('renders default content when no props provided', () => {
    render(<EmptyState />);
    expect(screen.getByText('No messages yet')).toBeInTheDocument();
    expect(screen.getByText('Start a conversation by typing a message below.')).toBeInTheDocument();
  });

  it('renders custom content when provided', () => {
    render(
      <EmptyState 
        title="Custom Title" 
        message="Custom message here" 
      />
    );
    
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom message here')).toBeInTheDocument();
  });
});

describe('InputArea Component', () => {
  it('renders the input field with default placeholder', () => {
    render(<InputArea onSendMessage={() => {}} mode="text" />);
    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
  });

  it('changes placeholder based on mode', () => {
    const { rerender } = render(<InputArea onSendMessage={() => {}} mode="text" />);
    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
    
    rerender(<InputArea onSendMessage={() => {}} mode="image" />);
    expect(screen.getByPlaceholderText('Describe an image to generate...')).toBeInTheDocument();
  });

  it('calls onSendMessage when submitting', () => {
    const handleSend = vi.fn();
    render(<InputArea onSendMessage={handleSend} mode="text" />);
    
    const input = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(input, { target: { value: 'Hello world' } });
    
    const button = screen.getByRole('button', { name: /send/i });
    fireEvent.click(button);
    
    expect(handleSend).toHaveBeenCalledWith('Hello world');
  });
});

describe('Message Component', () => {
  it('renders a text message from user correctly', () => {
    render(
      <Message 
        content="Hello world" 
        role="user" 
        type="text"
      />
    );
    
    expect(screen.getByText('Hello world')).toBeInTheDocument();
    expect(screen.getByText('You')).toBeInTheDocument();
  });
  
  it('renders a text message from assistant correctly', () => {
    render(
      <Message 
        content="How can I help?" 
        role="assistant" 
        type="text"
      />
    );
    
    expect(screen.getByText('How can I help?')).toBeInTheDocument();
    expect(screen.getByText('Assistant')).toBeInTheDocument();
  });
});

describe('ModeToggle Component', () => {
  it('renders both buttons', () => {
    render(<ModeToggle mode="text" onModeChange={() => {}} />);
    expect(screen.getByText('Text Chat')).toBeInTheDocument();
    expect(screen.getByText('Image Generation')).toBeInTheDocument();
  });
  
  it('calls onModeChange when image button is clicked', () => {
    const handleModeChange = vi.fn();
    render(<ModeToggle mode="text" onModeChange={handleModeChange} />);
    
    const imageButton = screen.getByText('Image Generation');
    fireEvent.click(imageButton);
    
    expect(handleModeChange).toHaveBeenCalledWith('image');
  });
  
  it('disables the current mode button', () => {
    render(<ModeToggle mode="text" onModeChange={() => {}} />);
    
    const textButton = screen.getByText('Text Chat');
    expect(textButton).toHaveAttribute('disabled');
    
    const imageButton = screen.getByText('Image Generation');
    expect(imageButton).not.toHaveAttribute('disabled');
  });
});