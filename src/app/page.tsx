'use client';

import { useState, useEffect } from 'react';
import { Heart, Dumbbell, Apple, Calendar, Trophy, User, Plus, Clock, Target, Flame, Bell, Play, Pause, RotateCcw, Eye, EyeOff, Mail, Lock, UserPlus, LogIn, Smartphone, Download, Settings, CheckCircle, AlertCircle, Info, Camera, Calculator, Activity, Fingerprint, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Workout {
  id: number;
  name: string;
  duration: number;
  exercises: Exercise[];
  calories: number;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  category: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
}

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  rest: number;
  instructions: string[];
  tips: string[];
  videoUrl: string;
}

interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  timeHour: string;
  ingredients: string[];
  preparation: string[];
  day: number;
}

interface User {
  name: string;
  email: string;
  weight: number;
  height: number;
  profilePhoto?: string;
  fitnessLevel: 'Iniciante' | 'Intermediário' | 'Avançado';
}

// Treinos por nível
const workoutsByLevel = {
  'Iniciante': [
    {
      id: 1,
      name: "Treino Básico - Corpo Todo",
      duration: 30,
      calories: 200,
      difficulty: "Iniciante" as const,
      level: "Iniciante" as const,
      category: "Corpo Todo",
      exercises: [
        {
          id: 1,
          name: "Caminhada no Lugar",
          sets: 1,
          reps: "5 min",
          rest: 30,
          videoUrl: "https://www.youtube.com/watch?v=ml6cT4AZdqI",
          instructions: [
            "Fique em pé com postura ereta",
            "Levante os joelhos alternadamente",
            "Balance os braços naturalmente",
            "Mantenha ritmo constante e confortável"
          ],
          tips: [
            "Comece devagar e aumente gradualmente",
            "Respire profundamente durante o exercício",
            "Mantenha o core levemente contraído"
          ]
        },
        {
          id: 2,
          name: "Agachamento Assistido",
          sets: 2,
          reps: "8-10",
          rest: 60,
          videoUrl: "https://www.youtube.com/watch?v=YaXPRqUwItQ",
          instructions: [
            "Use uma cadeira atrás de você como apoio",
            "Desça lentamente como se fosse sentar",
            "Toque levemente na cadeira e suba",
            "Mantenha os pés na largura dos ombros"
          ],
          tips: [
            "Não se apoie totalmente na cadeira",
            "Mantenha o peso nos calcanhares",
            "Suba contraindo glúteos e coxas"
          ]
        }
      ]
    }
  ],
  'Intermediário': [
    {
      id: 2,
      name: "Treino Glúteos & Pernas",
      duration: 45,
      calories: 320,
      difficulty: "Intermediário" as const,
      level: "Intermediário" as const,
      category: "Inferior",
      exercises: [
        {
          id: 3,
          name: "Agachamento Livre",
          sets: 3,
          reps: "12-15",
          rest: 60,
          videoUrl: "https://www.youtube.com/watch?v=YaXPRqUwItQ",
          instructions: [
            "Fique em pé com os pés na largura dos ombros",
            "Desça flexionando os joelhos como se fosse sentar",
            "Mantenha o peito erguido e o peso nos calcanhares",
            "Desça até as coxas ficarem paralelas ao chão",
            "Suba contraindo glúteos e coxas"
          ],
          tips: [
            "Não deixe os joelhos passarem da ponta dos pés",
            "Mantenha o core contraído durante todo movimento",
            "Respire inspirando na descida e expirando na subida"
          ]
        },
        {
          id: 4,
          name: "Afundo Alternado",
          sets: 3,
          reps: "10 cada perna",
          rest: 60,
          videoUrl: "https://www.youtube.com/watch?v=D7KaRcUTQeE",
          instructions: [
            "Fique em pé com os pés na largura do quadril",
            "Dê um passo à frente com uma perna",
            "Desça flexionando ambos os joelhos em 90°",
            "O joelho de trás quase toca o chão",
            "Volte à posição inicial e alterne as pernas"
          ],
          tips: [
            "Mantenha o tronco ereto durante todo movimento",
            "O joelho da frente não deve passar da ponta do pé",
            "Distribua o peso igualmente entre as duas pernas"
          ]
        }
      ]
    }
  ],
  'Avançado': [
    {
      id: 3,
      name: "HIIT Intenso - Queima Total",
      duration: 60,
      calories: 450,
      difficulty: "Avançado" as const,
      level: "Avançado" as const,
      category: "HIIT",
      exercises: [
        {
          id: 5,
          name: "Burpees",
          sets: 4,
          reps: "15-20",
          rest: 45,
          videoUrl: "https://www.youtube.com/watch?v=TU8QYVW0gDU",
          instructions: [
            "Comece em pé, depois agache e apoie as mãos no chão",
            "Jogue as pernas para trás em posição de prancha",
            "Faça uma flexão (opcional para iniciantes)",
            "Puxe as pernas de volta e pule para cima",
            "Repita o movimento de forma explosiva"
          ],
          tips: [
            "Mantenha o core sempre contraído",
            "Aterrisse suavemente para proteger as articulações",
            "Mantenha ritmo constante e controlado"
          ]
        },
        {
          id: 6,
          name: "Mountain Climbers",
          sets: 4,
          reps: "30 seg",
          rest: 30,
          videoUrl: "https://www.youtube.com/watch?v=kLh-uczlPLg",
          instructions: [
            "Comece em posição de prancha alta",
            "Traga um joelho em direção ao peito",
            "Alterne rapidamente as pernas",
            "Mantenha quadril estável",
            "Simule uma corrida na posição de prancha"
          ],
          tips: [
            "Não levante muito o quadril",
            "Mantenha as mãos firmes no chão",
            "Respire de forma controlada"
          ]
        }
      ]
    }
  ]
};

// Cardápios variados por dia da semana com horários
const mealsByDay = {
  1: [ // Segunda
    {
      id: 1,
      name: "Omelete de Aveia com Banana",
      calories: 285,
      protein: 16,
      carbs: 28,
      fat: 12,
      time: "Café da Manhã",
      timeHour: "07:00",
      day: 1,
      ingredients: [
        "2 ovos grandes (120g)",
        "2 colheres de sopa de aveia em flocos (20g)",
        "1 banana pequena (80g)",
        "1 colher de chá de óleo de coco (5g)",
        "Canela em pó a gosto"
      ],
      preparation: [
        "Bata os ovos com a aveia em uma tigela",
        "Amasse metade da banana e misture na massa",
        "Aqueça a frigideira com óleo de coco",
        "Despeje a mistura e cozinhe como omelete",
        "Sirva com fatias de banana e canela"
      ]
    },
    {
      id: 2,
      name: "Salada de Frango com Grão-de-Bico",
      calories: 385,
      protein: 42,
      carbs: 24,
      fat: 14,
      time: "Almoço",
      timeHour: "12:00",
      day: 1,
      ingredients: [
        "150g de peito de frango grelhado",
        "1/2 xícara de grão-de-bico cozido (80g)",
        "Folhas verdes variadas (100g)",
        "1 tomate médio (120g)",
        "1/2 pepino (80g)",
        "2 colheres de sopa de azeite extra virgem"
      ],
      preparation: [
        "Tempere e grelhe o frango até dourar",
        "Cozinhe o grão-de-bico até ficar macio",
        "Corte os vegetais em cubos pequenos",
        "Monte a salada com todos os ingredientes",
        "Tempere com azeite, limão e ervas"
      ]
    },
    {
      id: 3,
      name: "Vitamina de Banana com Aveia",
      calories: 195,
      protein: 9,
      carbs: 35,
      fat: 3,
      time: "Lanche",
      timeHour: "15:30",
      day: 1,
      ingredients: [
        "1 banana média (100g)",
        "200ml de leite desnatado",
        "2 colheres de sopa de aveia (20g)",
        "1 colher de chá de mel (7g)"
      ],
      preparation: [
        "Coloque todos os ingredientes no liquidificador",
        "Bata até obter consistência cremosa",
        "Adicione gelo se preferir mais gelado",
        "Sirva imediatamente"
      ]
    },
    {
      id: 4,
      name: "Peixe Assado com Batata Doce",
      calories: 420,
      protein: 38,
      carbs: 42,
      fat: 8,
      time: "Jantar",
      timeHour: "19:00",
      day: 1,
      ingredients: [
        "150g de filé de tilápia",
        "1 batata doce média (200g)",
        "Brócolis (100g)",
        "Cenoura (80g)",
        "Azeite, alho e ervas"
      ],
      preparation: [
        "Tempere o peixe com limão, alho e ervas",
        "Corte a batata doce em fatias",
        "Asse tudo no forno por 25-30 minutos",
        "Refogue os legumes rapidamente",
        "Sirva tudo junto bem quente"
      ]
    }
  ],
  2: [ // Terça
    {
      id: 5,
      name: "Panqueca de Banana Fit",
      calories: 290,
      protein: 18,
      carbs: 32,
      fat: 10,
      time: "Café da Manhã",
      timeHour: "07:00",
      day: 2,
      ingredients: [
        "1 banana madura amassada",
        "2 ovos",
        "2 colheres de sopa de farinha de aveia",
        "1 colher de chá de canela",
        "Mel a gosto"
      ],
      preparation: [
        "Misture a banana amassada com os ovos",
        "Adicione a farinha de aveia e canela",
        "Aqueça a frigideira antiaderente",
        "Faça pequenas panquecas douradas",
        "Sirva com mel"
      ]
    },
    {
      id: 6,
      name: "Bowl de Quinoa com Legumes",
      calories: 395,
      protein: 16,
      carbs: 58,
      fat: 12,
      time: "Almoço",
      timeHour: "12:00",
      day: 2,
      ingredients: [
        "1 xícara de quinoa cozida",
        "Abobrinha refogada",
        "Cenoura em cubos",
        "Pimentão colorido",
        "Azeite e temperos"
      ],
      preparation: [
        "Cozinhe a quinoa em água com sal",
        "Refogue os legumes separadamente",
        "Monte o bowl com quinoa como base",
        "Adicione os legumes por cima",
        "Tempere com azeite e ervas"
      ]
    },
    {
      id: 7,
      name: "Iogurte com Frutas Vermelhas",
      calories: 180,
      protein: 12,
      carbs: 25,
      fat: 4,
      time: "Lanche",
      timeHour: "15:30",
      day: 2,
      ingredients: [
        "1 pote de iogurte natural",
        "Mix de frutas vermelhas",
        "1 colher de sopa de granola",
        "Mel a gosto"
      ],
      preparation: [
        "Coloque o iogurte em uma tigela",
        "Adicione as frutas vermelhas",
        "Polvilhe a granola por cima",
        "Finalize com um fio de mel"
      ]
    },
    {
      id: 8,
      name: "Frango Grelhado com Arroz Integral",
      calories: 410,
      protein: 45,
      carbs: 35,
      fat: 9,
      time: "Jantar",
      timeHour: "19:00",
      day: 2,
      ingredients: [
        "150g de peito de frango",
        "1/2 xícara de arroz integral",
        "Salada verde",
        "Tomate cereja",
        "Azeite e limão"
      ],
      preparation: [
        "Tempere e grelhe o frango",
        "Cozinhe o arroz integral",
        "Prepare a salada verde",
        "Monte o prato balanceado",
        "Tempere com azeite e limão"
      ]
    }
  ],
  3: [ // Quarta
    {
      id: 9,
      name: "Smoothie Verde Detox",
      calories: 220,
      protein: 8,
      carbs: 38,
      fat: 6,
      time: "Café da Manhã",
      timeHour: "07:00",
      day: 3,
      ingredients: [
        "1 maçã verde",
        "Folhas de espinafre",
        "1/2 abacate",
        "200ml de água de coco",
        "Suco de 1/2 limão"
      ],
      preparation: [
        "Lave bem as folhas de espinafre",
        "Corte a maçã e o abacate",
        "Bata tudo no liquidificador",
        "Adicione gelo se desejar",
        "Sirva imediatamente"
      ]
    },
    {
      id: 10,
      name: "Salmão com Legumes no Vapor",
      calories: 380,
      protein: 35,
      carbs: 18,
      fat: 20,
      time: "Almoço",
      timeHour: "12:00",
      day: 3,
      ingredients: [
        "150g de salmão",
        "Brócolis",
        "Couve-flor",
        "Cenoura baby",
        "Azeite e ervas"
      ],
      preparation: [
        "Tempere o salmão com ervas",
        "Cozinhe no vapor por 15 min",
        "Prepare os legumes no vapor",
        "Sirva com azeite extra virgem",
        "Finalize com limão"
      ]
    },
    {
      id: 11,
      name: "Mix de Castanhas",
      calories: 160,
      protein: 6,
      carbs: 8,
      fat: 14,
      time: "Lanche",
      timeHour: "15:30",
      day: 3,
      ingredients: [
        "Castanha-do-pará",
        "Amêndoas",
        "Nozes",
        "Castanha de caju"
      ],
      preparation: [
        "Misture as castanhas em porções iguais",
        "Armazene em recipiente hermético",
        "Consuma 1 punhado (30g)",
        "Mastigue bem"
      ]
    },
    {
      id: 12,
      name: "Omelete de Legumes",
      calories: 280,
      protein: 22,
      carbs: 12,
      fat: 16,
      time: "Jantar",
      timeHour: "19:00",
      day: 3,
      ingredients: [
        "3 ovos",
        "Abobrinha picada",
        "Tomate cereja",
        "Cebola",
        "Queijo cottage"
      ],
      preparation: [
        "Refogue os legumes levemente",
        "Bata os ovos e tempere",
        "Faça o omelete na frigideira",
        "Adicione o queijo cottage",
        "Dobre e sirva quente"
      ]
    }
  ]
};

export default function FitGlowApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);
  const [waterIntake, setWaterIntake] = useState(6);
  const [dailyCalories, setDailyCalories] = useState(1285);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [currentDay, setCurrentDay] = useState(new Date().getDay() || 7); // 1-7 (segunda a domingo)
  const [user, setUser] = useState<User>({
    name: 'Bella Silva',
    email: 'bella@fitglow.com',
    weight: 65,
    height: 1.68,
    fitnessLevel: 'Intermediário'
  });

  // Formulário de login/cadastro
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    weight: '',
    height: '',
    fitnessLevel: 'Iniciante' as 'Iniciante' | 'Intermediário' | 'Avançado'
  });

  // Persistência de login usando localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('fitglow_user');
    const savedLoginState = localStorage.getItem('fitglow_logged_in');
    
    if (savedUser && savedLoginState === 'true') {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
      requestNotificationPermission();
    }
  }, []);

  // Salvar estado do usuário
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('fitglow_user', JSON.stringify(user));
      localStorage.setItem('fitglow_logged_in', 'true');
    } else {
      localStorage.removeItem('fitglow_user');
      localStorage.removeItem('fitglow_logged_in');
    }
  }, [isLoggedIn, user]);

  // Calcular IMC
  const calculateIMC = (weight: number, height: number) => {
    const imc = weight / (height * height);
    return imc.toFixed(1);
  };

  // Calcular Taxa Metabólica Basal (TMB) - Fórmula de Harris-Benedict para mulheres
  const calculateTMB = (weight: number, height: number, age: number = 25) => {
    const tmb = 447.593 + (9.247 * weight) + (3.098 * (height * 100)) - (4.330 * age);
    return Math.round(tmb);
  };

  // Classificação do IMC
  const getIMCClassification = (imc: number) => {
    if (imc < 18.5) return { text: 'Abaixo do peso', color: 'text-blue-600' };
    if (imc < 25) return { text: 'Peso normal', color: 'text-green-600' };
    if (imc < 30) return { text: 'Sobrepeso', color: 'text-yellow-600' };
    return { text: 'Obesidade', color: 'text-red-600' };
  };

  // Autenticação biométrica simulada
  const handleBiometricAuth = async () => {
    if ('navigator' in window && 'credentials' in navigator) {
      try {
        // Simular autenticação biométrica
        const credential = await navigator.credentials.create({
          publicKey: {
            challenge: new Uint8Array(32),
            rp: { name: "FitGlow" },
            user: {
              id: new Uint8Array(16),
              name: formData.email,
              displayName: formData.name || "Usuário"
            },
            pubKeyCredParams: [{ alg: -7, type: "public-key" }],
            authenticatorSelection: {
              authenticatorAttachment: "platform",
              userVerification: "required"
            }
          }
        });
        
        if (credential) {
          setBiometricEnabled(true);
          setIsLoggedIn(true);
          requestNotificationPermission();
        }
      } catch (error) {
        // Fallback para login normal se biometria não estiver disponível
        alert('Biometria não disponível. Use login normal.');
      }
    } else {
      alert('Biometria não suportada neste dispositivo.');
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser(prev => ({ ...prev, profilePhoto: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const openVideoModal = (videoUrl: string) => {
    // Abrir vídeo em nova aba em vez de modal para garantir funcionamento
    window.open(videoUrl, '_blank');
  };

  // Timer para treino
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWorkoutActive && !isResting) {
      interval = setInterval(() => {
        setWorkoutTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive, isResting]);

  // Timer para descanso
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  // Notificações com horários das refeições
  useEffect(() => {
    if (notifications && isLoggedIn) {
      const mealTimes = ['07:00', '12:00', '15:30', '19:00'];
      const workoutTime = '18:00';
      
      // Notificações de refeições
      mealTimes.forEach((time, index) => {
        const [hour, minute] = time.split(':').map(Number);
        const now = new Date();
        const notificationTime = new Date();
        notificationTime.setHours(hour, minute, 0, 0);
        
        if (notificationTime > now) {
          const timeout = notificationTime.getTime() - now.getTime();
          setTimeout(() => {
            if ('Notification' in window && Notification.permission === 'granted') {
              const mealNames = ['Café da Manhã', 'Almoço', 'Lanche', 'Jantar'];
              new Notification('FitGlow 🍎', {
                body: `Hora do ${mealNames[index]}! Mantenha sua alimentação em dia.`,
                icon: '/icon-192x192.png'
              });
            }
          }, timeout);
        }
      });

      // Notificação de treino
      const [workoutHour, workoutMinute] = workoutTime.split(':').map(Number);
      const workoutNotificationTime = new Date();
      workoutNotificationTime.setHours(workoutHour, workoutMinute, 0, 0);
      
      if (workoutNotificationTime > new Date()) {
        const timeout = workoutNotificationTime.getTime() - new Date().getTime();
        setTimeout(() => {
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('FitGlow 💪', {
              body: 'Hora do treino! Vamos manter o foco nos seus objetivos!',
              icon: '/icon-192x192.png'
            });
          }
        }, timeout);
      }
    }
  }, [notifications, isLoggedIn]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotifications(true);
        new Notification('FitGlow 💪', {
          body: 'Notificações ativadas! Te lembraremos dos treinos e refeições.',
          icon: '/icon-192x192.png'
        });
      }
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    requestNotificationPermission();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Senhas não coincidem!');
      return;
    }
    setUser({
      name: formData.name,
      email: formData.email,
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      fitnessLevel: formData.fitnessLevel
    });
    setIsLoggedIn(true);
    requestNotificationPermission();
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Link de recuperação enviado para seu email!');
    setShowForgotPassword(false);
  };

  const startWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
    setCurrentExercise(0);
    setIsWorkoutActive(true);
    setWorkoutTimer(0);
  };

  const nextExercise = () => {
    if (selectedWorkout && currentExercise < selectedWorkout.exercises.length - 1) {
      const currentEx = selectedWorkout.exercises[currentExercise];
      setRestTimer(currentEx.rest);
      setIsResting(true);
      setCurrentExercise(prev => prev + 1);
    } else {
      finishWorkout();
    }
  };

  const finishWorkout = () => {
    if (selectedWorkout) {
      setCompletedWorkouts(prev => [...prev, selectedWorkout.id]);
    }
    setSelectedWorkout(null);
    setIsWorkoutActive(false);
    setCurrentExercise(0);
    setWorkoutTimer(0);
    setIsResting(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Avançado': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Obter treinos baseados no nível do usuário
  const getUserWorkouts = () => {
    return workoutsByLevel[user.fitnessLevel] || workoutsByLevel['Iniciante'];
  };

  // Obter refeições do dia atual
  const getTodayMeals = () => {
    const dayMeals = mealsByDay[currentDay as keyof typeof mealsByDay];
    return dayMeals || mealsByDay[1]; // Fallback para segunda-feira
  };

  // Tela de Login/Cadastro
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-white fill-current" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              {showForgotPassword ? 'Recuperar Senha' : isRegistering ? 'Criar Conta' : 'Entrar no FitGlow'}
            </CardTitle>
            <p className="text-gray-600 text-sm">
              {showForgotPassword ? 'Digite seu email para recuperar' : isRegistering ? 'Comece sua jornada fitness hoje!' : 'Brilhe com saúde e fitness'}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {showForgotPassword ? (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      className="pl-10 rounded-xl border-gray-200 focus:border-pink-500"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl h-12 font-medium"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Enviar Link de Recuperação
                </Button>
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="text-sm text-gray-600 hover:text-pink-500 transition-colors"
                  >
                    Voltar ao login
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
                {isRegistering && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="rounded-xl border-gray-200 focus:border-pink-500"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="pl-10 rounded-xl border-gray-200 focus:border-pink-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                      className="pl-10 pr-10 rounded-xl border-gray-200 focus:border-pink-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                {isRegistering && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirme sua senha"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                          required
                          className="pl-10 rounded-xl border-gray-200 focus:border-pink-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight">Peso (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          placeholder="65"
                          value={formData.weight}
                          onChange={(e) => setFormData({...formData, weight: e.target.value})}
                          required
                          className="rounded-xl border-gray-200 focus:border-pink-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Altura (m)</Label>
                        <Input
                          id="height"
                          type="number"
                          step="0.01"
                          placeholder="1.68"
                          value={formData.height}
                          onChange={(e) => setFormData({...formData, height: e.target.value})}
                          required
                          className="rounded-xl border-gray-200 focus:border-pink-500"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fitnessLevel">Nível de Condicionamento</Label>
                      <Select value={formData.fitnessLevel} onValueChange={(value: string) => setFormData({...formData, fitnessLevel: value as 'Iniciante' | 'Intermediário' | 'Avançado'})}>
                        <SelectTrigger className="rounded-xl border-gray-200 focus:border-pink-500">
                          <SelectValue placeholder="Selecione seu nível" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Iniciante">Iniciante</SelectItem>
                          <SelectItem value="Intermediário">Intermediário</SelectItem>
                          <SelectItem value="Avançado">Avançado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl h-12 font-medium"
                >
                  {isRegistering ? (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Criar Conta
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Entrar
                    </>
                  )}
                </Button>
                
                {/* Autenticação Biométrica */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">ou</span>
                  </div>
                </div>
                
                <Button
                  type="button"
                  onClick={handleBiometricAuth}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl h-12 font-medium"
                >
                  <Fingerprint className="w-4 h-4 mr-2" />
                  Entrar com Face ID / Touch ID
                </Button>
              </form>
            )}
            
            {!showForgotPassword && (
              <div className="text-center pt-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-sm text-gray-600 hover:text-pink-500 transition-colors block w-full"
                >
                  {isRegistering 
                    ? 'Já tem uma conta? Faça login' 
                    : 'Não tem conta? Cadastre-se grátis'
                  }
                </button>
                
                {!isRegistering && (
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-gray-500 hover:text-pink-500 transition-colors"
                  >
                    Esqueceu sua senha?
                  </button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela de treino ativo
  if (selectedWorkout && isWorkoutActive) {
    const currentEx = selectedWorkout.exercises[currentExercise];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={() => setSelectedWorkout(null)}
              variant="ghost"
              className="text-white hover:bg-white/20 rounded-xl"
            >
              ← Voltar
            </Button>
            <div className="text-center">
              <div className="text-2xl font-bold">{formatTime(workoutTimer)}</div>
              <div className="text-sm text-pink-100">Tempo de treino</div>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-xl font-bold">{selectedWorkout.name}</h1>
            <p className="text-pink-100">
              Exercício {currentExercise + 1} de {selectedWorkout.exercises.length}
            </p>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {isResting ? (
            <Card className="bg-orange-50 border-orange-200 rounded-2xl">
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 mx-auto mb-4 text-orange-500" />
                <h2 className="text-2xl font-bold text-orange-800 mb-2">Descanso</h2>
                <div className="text-4xl font-bold text-orange-600 mb-4">
                  {formatTime(restTimer)}
                </div>
                <p className="text-orange-700">
                  Prepare-se para o próximo exercício: {selectedWorkout.exercises[currentExercise].name}
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl text-center text-gray-800">
                  {currentEx.name}
                </CardTitle>
                <div className="flex justify-center gap-4 text-sm text-gray-600">
                  <span>{currentEx.sets} séries</span>
                  <span>{currentEx.reps} repetições</span>
                  <span>{currentEx.rest}s descanso</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Botão de vídeo demonstrativo */}
                <div className="text-center">
                  <Button
                    onClick={() => openVideoModal(currentEx.videoUrl)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-6"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Ver Demonstração
                  </Button>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Como fazer:</h3>
                  <ol className="space-y-2">
                    {currentEx.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 text-sm">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Dicas importantes:</h3>
                  <ul className="space-y-2">
                    {currentEx.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={nextExercise}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl h-12"
                  >
                    {currentExercise === selectedWorkout.exercises.length - 1 ? 'Finalizar Treino' : 'Próximo Exercício'}
                  </Button>
                  <Button
                    onClick={finishWorkout}
                    variant="outline"
                    className="px-6 rounded-xl border-gray-300"
                  >
                    Parar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  const imc = parseFloat(calculateIMC(user.weight, user.height));
  const imcClassification = getIMCClassification(imc);
  const tmb = calculateTMB(user.weight, user.height);
  const userWorkouts = getUserWorkouts();
  const todayMeals = getTodayMeals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Heart className="w-7 h-7 fill-current" />
              FitGlow
            </h1>
            <p className="text-pink-100 text-sm">Brilhe com saúde e fitness</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-pink-100">Olá, {user.name.split(' ')[0]}!</p>
            <div className="flex items-center gap-1 text-xs">
              <Flame className="w-4 h-4" />
              <span>{dailyCalories} kcal hoje</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm rounded-2xl p-1 mb-6">
            <TabsTrigger value="home" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Heart className="w-4 h-4 mr-1" />
              Início
            </TabsTrigger>
            <TabsTrigger value="workouts" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Dumbbell className="w-4 h-4 mr-1" />
              Treinos
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Apple className="w-4 h-4 mr-1" />
              Nutrição
            </TabsTrigger>
            <TabsTrigger value="profile" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <User className="w-4 h-4 mr-1" />
              Perfil
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            {/* Notificações Alert */}
            {!notifications && (
              <Alert className="bg-orange-50 border-orange-200 rounded-2xl">
                <Bell className="h-4 w-4 text-orange-500" />
                <AlertDescription className="text-orange-800">
                  <div className="flex items-center justify-between">
                    <span>Ative as notificações para não perder seus treinos e refeições!</span>
                    <Button
                      onClick={requestNotificationPermission}
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                    >
                      Ativar
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Daily Progress */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                  <Trophy className="w-5 h-5 text-pink-500" />
                  Progresso de Hoje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl">
                    <div className="text-2xl font-bold text-pink-600">{completedWorkouts.length}</div>
                    <div className="text-xs text-pink-700">Treinos</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">{waterIntake}</div>
                    <div className="text-xs text-purple-700">Copos d'água</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Meta de Calorias</span>
                    <span className="font-medium text-gray-800">{dailyCalories}/1800 kcal</span>
                  </div>
                  <Progress value={(dailyCalories / 1800) * 100} className="h-2 bg-gray-200" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => setActiveTab('workouts')}
                className="h-20 bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-2xl shadow-lg"
              >
                <div className="text-center">
                  <Dumbbell className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-sm font-medium">Iniciar Treino</div>
                </div>
              </Button>
              
              <Button 
                onClick={() => setWaterIntake(prev => prev + 1)}
                className="h-20 bg-gradient-to-br from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white rounded-2xl shadow-lg"
              >
                <div className="text-center">
                  <Plus className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-sm font-medium">Beber Água</div>
                </div>
              </Button>
            </div>

            {/* Today's Workout */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  Treino Recomendado - Nível {user.fitnessLevel}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-800">{userWorkouts[0]?.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {userWorkouts[0]?.duration}min
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        {userWorkouts[0]?.exercises.length} exercícios
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => startWorkout(userWorkouts[0])}
                    disabled={completedWorkouts.includes(userWorkouts[0]?.id)}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl"
                  >
                    {completedWorkouts.includes(userWorkouts[0]?.id) ? 'Concluído' : 'Iniciar'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workouts Tab */}
          <TabsContent value="workouts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Treinos - Nível {user.fitnessLevel}</h2>
              <Badge className="bg-pink-100 text-pink-800 border-pink-200">
                {completedWorkouts.length} concluídos hoje
              </Badge>
            </div>
            
            {userWorkouts.map((workout) => (
              <Card key={workout.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{workout.name}</h3>
                      <Badge className={`text-xs ${getDifficultyColor(workout.difficulty)}`}>
                        {workout.difficulty}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-800">{workout.category}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div className="p-2 bg-pink-50 rounded-lg">
                      <Clock className="w-4 h-4 mx-auto mb-1 text-pink-500" />
                      <div className="text-xs text-gray-600">{workout.duration}min</div>
                    </div>
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Target className="w-4 h-4 mx-auto mb-1 text-purple-500" />
                      <div className="text-xs text-gray-600">{workout.exercises.length} exercícios</div>
                    </div>
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <Flame className="w-4 h-4 mx-auto mb-1 text-orange-500" />
                      <div className="text-xs text-gray-600">{workout.calories} kcal</div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => startWorkout(workout)}
                    disabled={completedWorkouts.includes(workout.id)}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl"
                  >
                    {completedWorkouts.includes(workout.id) ? '✓ Concluído' : 'Iniciar Treino'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Cardápio do Dia</h2>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setCurrentDay(currentDay > 1 ? currentDay - 1 : 7)}
                  size="sm"
                  variant="outline"
                  className="rounded-lg"
                >
                  ←
                </Button>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Dia {currentDay}
                </Badge>
                <Button
                  onClick={() => setCurrentDay(currentDay < 7 ? currentDay + 1 : 1)}
                  size="sm"
                  variant="outline"
                  className="rounded-lg"
                >
                  →
                </Button>
              </div>
            </div>

            <Alert className="bg-blue-50 border-blue-200 rounded-2xl">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-800">
                <strong>Cardápio variado:</strong> Cada dia uma nova combinação de refeições nutritivas com horários ideais!
              </AlertDescription>
            </Alert>

            {/* Daily Summary */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Resumo Diário</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded-xl">
                    <div className="text-lg font-bold text-green-600">
                      {todayMeals.reduce((sum, meal) => sum + meal.protein, 0)}g
                    </div>
                    <div className="text-xs text-green-700">Proteína</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <div className="text-lg font-bold text-blue-600">
                      {todayMeals.reduce((sum, meal) => sum + meal.carbs, 0)}g
                    </div>
                    <div className="text-xs text-blue-700">Carboidratos</div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-xl">
                    <div className="text-lg font-bold text-yellow-600">
                      {todayMeals.reduce((sum, meal) => sum + meal.fat, 0)}g
                    </div>
                    <div className="text-xs text-yellow-700">Gorduras</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Meals with Times */}
            {todayMeals.map((meal) => (
              <Card key={meal.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{meal.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="text-xs bg-gray-100 text-gray-700 border-gray-200">
                          {meal.time}
                        </Badge>
                        <Badge className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                          <Clock className="w-3 h-3 mr-1" />
                          {meal.timeHour}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-800">{meal.calories}</div>
                      <div className="text-xs text-gray-600">kcal</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-700">{meal.protein}g</div>
                      <div className="text-green-600">Proteína</div>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-700">{meal.carbs}g</div>
                      <div className="text-blue-600">Carbs</div>
                    </div>
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-700">{meal.fat}g</div>
                      <div className="text-yellow-600">Gordura</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Ingredientes:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {meal.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Modo de preparo:</h4>
                      <ol className="text-sm text-gray-600 space-y-1">
                        {meal.preparation.map((step, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="bg-purple-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6 text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  {user.profilePhoto ? (
                    <img 
                      src={user.profilePhoto} 
                      alt="Foto de perfil" 
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  )}
                  <label className="absolute -bottom-1 -right-1 bg-pink-500 hover:bg-pink-600 text-white rounded-full p-2 cursor-pointer shadow-lg">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h2>
                <p className="text-gray-600 text-sm mb-2">Influencer & Fitness Enthusiast</p>
                <Badge className={`text-xs ${getDifficultyColor(user.fitnessLevel)}`}>
                  Nível {user.fitnessLevel}
                </Badge>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-3 bg-pink-50 rounded-xl">
                    <div className="text-lg font-bold text-pink-600">{user.weight}kg</div>
                    <div className="text-xs text-pink-700">Peso Atual</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <div className="text-lg font-bold text-purple-600">{user.height}m</div>
                    <div className="text-xs text-purple-700">Altura</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* IMC e TMB */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                  <Calculator className="w-5 h-5 text-blue-500" />
                  Indicadores de Saúde
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl text-center">
                    <div className="text-2xl font-bold text-blue-600">{calculateIMC(user.weight, user.height)}</div>
                    <div className="text-sm text-blue-700 mb-1">IMC</div>
                    <div className={`text-xs font-medium ${imcClassification.color}`}>
                      {imcClassification.text}
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl text-center">
                    <div className="text-2xl font-bold text-green-600">{tmb}</div>
                    <div className="text-sm text-green-700 mb-1">TMB</div>
                    <div className="text-xs text-green-600">kcal/dia</div>
                  </div>
                </div>
                
                <Alert className="bg-blue-50 border-blue-200">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <AlertDescription className="text-blue-800 text-sm">
                    <strong>TMB:</strong> Taxa Metabólica Basal - calorias que seu corpo queima em repouso.
                    <br />
                    <strong>IMC:</strong> Índice de Massa Corporal - relação entre peso e altura.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Tutorial PWA */}
            <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Como instalar no seu celular
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => setShowTutorial(!showTutorial)}
                  className="w-full bg-white/20 hover:bg-white/30 text-white rounded-xl"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {showTutorial ? 'Ocultar Tutorial' : 'Ver Tutorial de Instalação'}
                </Button>
                
                {showTutorial && (
                  <div className="space-y-4 bg-white/10 rounded-xl p-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        📱 No iPhone (Safari):
                      </h4>
                      <ol className="text-sm space-y-1 text-blue-100">
                        <li>1. Abra este site no Safari</li>
                        <li>2. Toque no ícone de compartilhar (quadrado com seta)</li>
                        <li>3. Role para baixo e toque em "Adicionar à Tela de Início"</li>
                        <li>4. Toque em "Adicionar" no canto superior direito</li>
                        <li>5. Pronto! O FitGlow aparecerá na sua tela inicial</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        🤖 No Android (Chrome):
                      </h4>
                      <ol className="text-sm space-y-1 text-blue-100">
                        <li>1. Abra este site no Chrome</li>
                        <li>2. Toque nos 3 pontinhos no canto superior direito</li>
                        <li>3. Toque em "Adicionar à tela inicial"</li>
                        <li>4. Confirme tocando em "Adicionar"</li>
                        <li>5. O FitGlow será instalado como um app!</li>
                      </ol>
                    </div>
                    
                    <Alert className="bg-white/20 border-white/30">
                      <Info className="h-4 w-4" />
                      <AlertDescription className="text-white">
                        <strong>Vantagens:</strong> Funciona offline, notificações push, experiência como app nativo!
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Configurações */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                  <Settings className="w-5 h-5" />
                  Configurações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-800">Notificações</div>
                    <div className="text-sm text-gray-600">Lembretes de treino e refeições</div>
                  </div>
                  <Button
                    onClick={() => setNotifications(!notifications)}
                    className={`rounded-xl ${notifications 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                    } text-white`}
                  >
                    {notifications ? 'Ativado' : 'Desativado'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-800">Biometria</div>
                    <div className="text-sm text-gray-600">Face ID / Touch ID para login</div>
                  </div>
                  <Button
                    onClick={() => setBiometricEnabled(!biometricEnabled)}
                    className={`rounded-xl ${biometricEnabled 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                    } text-white`}
                  >
                    {biometricEnabled ? 'Ativado' : 'Desativado'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-800">Sair da conta</div>
                    <div className="text-sm text-gray-600">Fazer logout do aplicativo</div>
                  </div>
                  <Button
                    onClick={() => {
                      setIsLoggedIn(false);
                      localStorage.removeItem('fitglow_user');
                      localStorage.removeItem('fitglow_logged_in');
                    }}
                    variant="outline"
                    className="rounded-xl border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Sair
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Treinos esta semana</span>
                  <span className="font-bold text-gray-800">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Calorias queimadas</span>
                  <span className="font-bold text-gray-800">2,840 kcal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sequência atual</span>
                  <span className="font-bold text-gray-800">7 dias</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Meta mensal</span>
                  <span className="font-bold text-green-600">85% concluída</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-lg font-bold mb-2">Parabéns!</h3>
                <p className="text-pink-100 text-sm">
                  Você está no caminho certo para seus objetivos de fitness!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}