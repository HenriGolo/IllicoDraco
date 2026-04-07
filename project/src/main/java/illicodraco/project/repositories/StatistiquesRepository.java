package illicodraco.project.repositories;

import illicodraco.project.beans.*;
import java.util.Optional;
import java.util.Collection;

// Interface java gérant le repository des Statistiques
public interface StatistiquesRepository extends JpaRepository<Statistiques,Integer> {

    Statistiques save(Statistiques stats);
    
    Optional<Statistiques> findById(Integer id);
    
    Collection<Statistiques> findAll();
    
    Long count();

}