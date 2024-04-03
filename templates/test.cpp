#include <bits/stdc++.h> 
using namespace std; 

int count_minimum(string s) 
{ 
	int n = s.length(); 
	int ans = 0; 
	int i = 0; 
	while (i < n) { 
		int j = i; 
		while (s[j] == s[i] && j < n) { 
			j++; 
		} 
		int diff = j - i; 
		ans += diff / 2; 
		i = j; 
	} 
	return ans; 
} 
int main() 
{ 
    char words[2][10]= { "add", "boook", "break"};
  int n = sizeof(words) / sizeof(words[0]); 
  int count[n];
  for(int i=0; i<n;i++)
  {
	  count[i]=count_minimum(words[i]);
  } 
	return 0; 
} 
