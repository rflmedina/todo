import React from 'react';
import { TouchableOpacity } from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

const TodoItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #ccc;
  padding: 10px 0;
`;

const TodoItemText = styled.Text<{ completed: boolean }>`
  flex: 1;
  font-size: 18px;
  color: ${(props) => (props.completed ? '#aaa' : '#333')};
  text-decoration-line: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

const TodoItemButton = styled.TouchableOpacity``;

interface TodoItemProps {
  text: string;
  completed: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ text, completed, onPress, onLongPress }) => (
  <TodoItemContainer>
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <TodoItemText completed={completed}>{text}</TodoItemText>
    </TouchableOpacity>
    {!completed && (
      <TodoItemButton onPress={onLongPress}>
        <AntDesign name="delete" size={24} color="#ff6347" />
      </TodoItemButton>
    )}
  </TodoItemContainer>
);

export default TodoItem;
