"use client"
import { useEffect, useState } from 'react';

export default function Habits() {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready(); 
    
    // Попробуем получить данные из WebApp Storage:
    const dataStr = tg.storageData; // строка (JSON), которую мы ранее сохранили
    if (dataStr) {
      try {
        const parsedData = JSON.parse(dataStr);
        setUserData(parsedData);
      } catch (err) {
        console.error('Ошибка парсинга WebApp Storage:', err);
      }
    }

    return () => {
      // Если нужно, при размонтаже компонента можно что-то делать
    };
  }, []);

  const saveHabit = () => {
    if (!userData) return;
    
    // Допустим, хотим добавить новую привычку
    const newHabit = {
      id: 'habit-3',
      title: 'Новая привычка',
      description: 'Описание новой привычки',
      frequency: 'daily',
      startDate: '2024-12-25',
      completedDates: [],
      status: 'in-progress'
    };

    const updatedUserData = {
      ...userData,
      habits: [...userData.habits, newHabit],
    };

    // Сохраняем обновлённые данные в стейт
    setUserData(updatedUserData);

    // А затем пытаемся сохранить в WebApp Storage
    const tg = window.Telegram.WebApp;
    tg.setStorageData(JSON.stringify(updatedUserData));
  };

  return (
    <div>
      <h1>Мои привычки</h1>
      {userData?.habits?.map(habit => (
        <div key={habit.id} style={{ marginBottom: '10px' }}>
          <strong>{habit.title}</strong> — {habit.status}
        </div>
      ))}

      <button onClick={saveHabit}>Добавить привычку</button>
    </div>
  );
}