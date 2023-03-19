import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
//@ts-ignore
import styled from 'styled-components/native';

import TodoItem from './TodoItem';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  margin-top: ${Constants.statusBarHeight}px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  height: 40px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 10px;
`;

const Button = styled.TouchableOpacity`
  background-color: #1e90ff;
  padding: 10px 20px;
  border-radius: 4px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const TodoList = styled.FlatList`
  flex: 1;
  margin-bottom: 10px;
`;

const TodoCounter = styled.Text`
  font-size: 16px;
  color: #aaa;
`;

export default function App() {
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>([]);
  const [todoText, setTodoText] = useState<string>('');

  const handleAddTodo = () => {
    if (todoText.trim()) {
      setTodos([...todos, { text: todoText, completed: false }]);
      setTodoText('');
    }
  };

  const handleToggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleRemoveTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const renderTodoItem = ({ item, index }: { item: { text: string; completed: boolean }; index: number }) => (
    <TodoItem
      text={item.text}
      completed={item.completed}
      onPress={() => handleToggleTodo(index)}
      onLongPress={() => handleRemoveTodo(index)}
    />
  );

  const totalTodos = todos.length;
  const totalCompletedTodos = todos.filter((todo) => todo.completed).length;

  return (
    <Container>
      <Title>Todo List</Title>
      <Input value={todoText} onChangeText={(text) => setTodoText(text)} placeholder="Add a todo" />
      <Button onPress={handleAddTodo}>
        <ButtonText>Add</ButtonText>
      </Button>
      <TodoList data={todos} renderItem={renderTodoItem} keyExtractor={(_, index) => index.toString()} />
      <TodoCounter>{`${totalCompletedTodos} completed / ${totalTodos} total`}</TodoCounter>
    </Container>
  );
}
