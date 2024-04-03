#include <iostream>
using namespace std;

int main() {
	int t,n;
	cin>>t;
	for(int i=0;i<t;i++){
	    cin>>n;
	    int a[n];
	    int m=n;
	    for(int j=0;j<n;j++){
	        cin>>a[i];
	    }
	    for(int j=0;j<n;j++){
	        for(int k=0;k<n;k++){
	            if(a[j]==a[k] && i!=j) {m--;}
	    }
	    }
	cout<<m<<endl;
	}
}