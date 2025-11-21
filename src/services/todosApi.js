import { supabase } from './supabaseClient';

export async function getTodos() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function addTodo(text, category = null, dueDate = null, priority = 'medium') {
  const payload = { text, priority };
  if (category) payload.category = category;
  if (dueDate) payload.due_date = dueDate;

  const { data, error } = await supabase
    .from('todos')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTodo(id, updates) {
  const { data, error } = await supabase
    .from('todos')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTodo(id) {
  const { error } = await supabase.from('todos').delete().eq('id', id);
  if (error) throw error;
  return id;
}
