import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useAuth } from '../../hooks/useAuth';

export default function SignInScreen({ onSwitchToSignUp, onClose }) {
  const insets = useSafeAreaInsets();
  const { signIn, loading, error } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      setLocalError('Please fill in all fields');
      return;
    }

    try {
      setLocalError('');
      await signIn(email.trim(), password);
      // On successful sign in, the auth state will update and close modal
    } catch (err) {
      setLocalError(err.message || 'Failed to sign in');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ 
        flex: 1, 
        backgroundColor: '#fff',
        paddingTop: insets.top + 20
      }}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
          <TouchableOpacity 
            onPress={onClose}
            style={{ 
              alignSelf: 'flex-end',
              padding: 8,
              marginBottom: 20
            }}
          >
            <Text style={{ fontSize: 16, color: '#6b7280' }}>✕</Text>
          </TouchableOpacity>
          
          <Text style={{ 
            fontSize: 28, 
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: 8
          }}>
            Welcome Back!
          </Text>
          <Text style={{ 
            fontSize: 16, 
            color: '#6b7280'
          }}>
            Sign in to your account to continue
          </Text>
        </View>

        {/* Form */}
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
          {/* Email Input */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontSize: 14, 
              fontWeight: '600',
              color: '#374151',
              marginBottom: 8
            }}>
              Email
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f9fafb',
              borderWidth: 1,
              borderColor: '#e5e7eb',
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12
            }}>
              <Mail size={20} color="#6b7280" />
              <TextInput
                style={{
                  flex: 1,
                  marginLeft: 12,
                  fontSize: 16,
                  color: '#1f2937'
                }}
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ 
              fontSize: 14, 
              fontWeight: '600',
              color: '#374151',
              marginBottom: 8
            }}>
              Password
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f9fafb',
              borderWidth: 1,
              borderColor: '#e5e7eb',
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12
            }}>
              <Lock size={20} color="#6b7280" />
              <TextInput
                style={{
                  flex: 1,
                  marginLeft: 12,
                  fontSize: 16,
                  color: '#1f2937'
                }}
                placeholder="Enter your password"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ padding: 4 }}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#6b7280" />
                ) : (
                  <Eye size={20} color="#6b7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Error Message */}
          {(localError || error) && (
            <View style={{
              backgroundColor: '#fef2f2',
              borderWidth: 1,
              borderColor: '#fecaca',
              borderRadius: 8,
              padding: 12,
              marginBottom: 20
            }}>
              <Text style={{ color: '#dc2626', fontSize: 14 }}>
                {localError || error}
              </Text>
            </View>
          )}

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={handleSignIn}
            disabled={loading}
            style={{
              backgroundColor: loading ? '#d1d5db' : '#ef4444',
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: 'center',
              marginBottom: 20
            }}
          >
            <Text style={{ 
              color: '#fff', 
              fontSize: 16, 
              fontWeight: '600'
            }}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity
            style={{ alignItems: 'center', marginBottom: 20 }}
          >
            <Text style={{ color: '#6b7280', fontSize: 14 }}>
              Forgot your password?{' '}
              <Text style={{ color: '#ef4444', fontWeight: '600' }}>
                Reset it
              </Text>
            </Text>
          </TouchableOpacity>

          {/* Switch to Sign Up */}
          <TouchableOpacity
            onPress={onSwitchToSignUp}
            style={{ alignItems: 'center' }}
          >
            <Text style={{ color: '#6b7280', fontSize: 14 }}>
              Don't have an account?{' '}
              <Text style={{ color: '#ef4444', fontWeight: '600' }}>
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}