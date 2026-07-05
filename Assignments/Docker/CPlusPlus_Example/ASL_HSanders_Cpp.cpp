#include <iostream>
#include <ctime>

int main()
{
   std::time_t timestamp; //Create variable for holding time
   time(&timestamp); //using time library time function to access current time and assign to variable.


    std::cout << "Current Date and Time: " << std::ctime(&timestamp) 
              << "Hello ASL!"
              << std::endl;
              //Console Out to display current d/t and string message which requires iostream library.
}