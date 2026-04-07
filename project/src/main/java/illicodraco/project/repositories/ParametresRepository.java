package illicodraco.project.repositories;

import illicodraco.project.beans.*;
import java.util.Optional;
import java.util.Collection;

// Interface java gérant le repository des Parametres
public interface ParametresRepository extends JpaRepository<Parametres,Integer> {

    Parametres save(Parametres params);
    
    Optional<Parametres> findById(Integer id);
    
    Collection<Parametres> findAll();
    
    Long count();

}